import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Server {
  id: number;
  name: string;
  ip: string;
  status: 'online' | 'offline';
  location: string;
  uptime: string;
}

const servers: Server[] = [
  { id: 1, name: 'ALPHA-SRV-01', ip: '192.168.1.100', status: 'online', location: 'Moscow DC', uptime: '99.9%' },
  { id: 2, name: 'BETA-SRV-02', ip: '10.0.0.45', status: 'online', location: 'Saint Petersburg', uptime: '99.8%' },
  { id: 3, name: 'GAMMA-SRV-03', ip: '172.16.0.233', status: 'offline', location: 'Novosibirsk', uptime: '95.2%' },
  { id: 4, name: 'DELTA-SRV-04', ip: '192.168.100.12', status: 'online', location: 'Yekaterinburg', uptime: '99.7%' },
  { id: 5, name: 'EPSILON-SRV-05', ip: '10.10.10.88', status: 'online', location: 'Kazan', uptime: '99.9%' },
  { id: 6, name: 'ZETA-SRV-06', ip: '172.31.255.1', status: 'online', location: 'Rostov', uptime: '98.9%' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('servers');
  const { toast } = useToast();

  const copyToClipboard = (ip: string) => {
    navigator.clipboard.writeText(ip);
    toast({
      description: (
        <span className="terminal-glow">
          IP {ip} copied to clipboard
        </span>
      ),
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold terminal-glow mb-2 animate-fade-in">
            &gt; SERVER IP LIST
          </h1>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            System monitoring interface v2.4.1
          </p>
        </header>

        <nav className="flex gap-4 mb-8 border-b border-border pb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {['servers', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 transition-all ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary terminal-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>

        {activeTab === 'servers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servers.map((server, index) => (
              <Card
                key={server.id}
                className="bg-card border-2 border-border terminal-border p-6 hover:border-primary transition-all animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Server" size={20} className="text-primary" />
                    <h3 className="font-bold text-lg terminal-glow">{server.name}</h3>
                  </div>
                  <div className={`flex items-center gap-2 ${server.status === 'online' ? 'text-primary' : 'text-destructive'}`}>
                    <div className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-primary animate-pulse-glow' : 'bg-destructive'}`} />
                    <span className="text-xs uppercase">{server.status}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{server.location}</span>
                  </div>
                  
                  <div className="bg-background p-3 rounded border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">IP ADDRESS:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(server.ip)}
                        className="h-6 px-2 hover:bg-primary/20 hover:text-primary"
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                    </div>
                    <p className="text-xl font-mono terminal-glow mt-1">{server.ip}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">UPTIME:</span>
                    <span className="text-primary font-mono">{server.uptime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <Card className="bg-card border-2 border-border terminal-border p-8 animate-fade-in">
            <h2 className="text-2xl font-bold terminal-glow mb-4">&gt; SYSTEM SETTINGS</h2>
            <p className="text-muted-foreground mb-4">Configuration options coming soon...</p>
            <div className="space-y-2 text-sm font-mono">
              <div className="text-muted-foreground">&gt; refresh_interval: 30s</div>
              <div className="text-muted-foreground">&gt; notification_enabled: true</div>
              <div className="text-muted-foreground">&gt; theme: terminal_green</div>
            </div>
          </Card>
        )}

        <footer className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '1s' }}>
          <p>&gt; System operational | Last update: {new Date().toLocaleTimeString('ru-RU')}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
