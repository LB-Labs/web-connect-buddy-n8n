
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Globe, Settings, Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import WorkflowManager from "@/components/WorkflowManager";
import ConnectionConfig from "@/components/ConnectionConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "My Website",
      url: "https://mywebsite.com",
      status: "connected",
      lastSync: "2 minutes ago",
      events: 1234,
      uptime: "99.9%"
    },
    {
      id: 2,
      name: "E-commerce Store",
      url: "https://shop.example.com",
      status: "connected",
      lastSync: "5 minutes ago",
      events: 567,
      uptime: "98.5%"
    }
  ]);
  const [copied, setCopied] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const copyApiKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopied(true);
      toast.success("API Key copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfigure = (connection: any) => {
    setSelectedConnection(connection);
    setIsConfigOpen(true);
  };

  const sendTestWebhook = async (connectionId: number) => {
    toast.success("Test webhook sent successfully!");
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Webhook received and processed!");
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your website connections and workflows</p>
        </div>

        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="api">API Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Website Connections</h2>
              <Button onClick={() => navigate('/connect')} className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Connect Website
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {connections.map((connection) => (
                <Card key={connection.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Globe className="h-8 w-8 text-blue-600" />
                      <Badge variant={connection.status === 'connected' ? 'default' : 'secondary'}>
                        {connection.status}
                      </Badge>
                    </div>
                    <CardTitle>{connection.name}</CardTitle>
                    <CardDescription>{connection.url}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Events:</span>
                        <p className="text-gray-600">{connection.events}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Uptime:</span>
                        <p className="text-gray-600">{connection.uptime}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Last sync: {connection.lastSync}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleConfigure(connection)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => sendTestWebhook(connection.id)}
                      >
                        Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workflows">
            <WorkflowManager />
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Use this API key to connect your website to n8n workflows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Your API Key</label>
                  <div className="mt-1 flex">
                    <input
                      type="text"
                      value={user.apiKey}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                    />
                    <Button 
                      onClick={copyApiKey}
                      variant="outline" 
                      className="rounded-l-none"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Integration Instructions:</h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Copy your API key above</li>
                    <li>2. Add it to your website's configuration</li>
                    <li>3. Use our webhook URL: https://api.n8n-webflow.com/webhook</li>
                    <li>4. Start sending events to trigger workflows</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Example Webhook Request:</h4>
                  <pre className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded overflow-x-auto">
{`curl -X POST https://api.n8n-webflow.com/webhook \\
  -H "Authorization: Bearer ${user.apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event": "user_signup",
    "data": {
      "email": "user@example.com",
      "name": "John Doe"
    }
  }'`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ConnectionConfig 
        connection={selectedConnection}
        isOpen={isConfigOpen}
        onClose={() => {
          setIsConfigOpen(false);
          setSelectedConnection(null);
        }}
      />
    </div>
  );
};

export default Dashboard;
