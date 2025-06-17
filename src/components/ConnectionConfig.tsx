
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Settings, Activity, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ConnectionConfigProps {
  connection: any;
  isOpen: boolean;
  onClose: () => void;
}

const ConnectionConfig = ({ connection, isOpen, onClose }: ConnectionConfigProps) => {
  const [config, setConfig] = useState({
    name: connection?.name || "",
    url: connection?.url || "",
    webhookUrl: "https://api.n8n-webflow.com/webhook/user123/website456",
    enableLogging: true,
    enableRetries: true,
    maxRetries: 3,
    timeout: 30,
    customHeaders: "",
    allowedEvents: {
      user_signup: true,
      user_login: false,
      order_created: true,
      form_submitted: true,
      payment_completed: false
    }
  });

  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = async () => {
    toast.success("Connection configuration saved successfully!");
    onClose();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    setTimeout(() => {
      setTestResult("success");
      setIsTesting(false);
      toast.success("Connection test successful!");
    }, 2000);
  };

  const handleWebhookTest = async () => {
    toast.success("Test webhook sent! Check your endpoint for the test event.");
  };

  if (!connection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Configure {connection.name}
          </DialogTitle>
          <DialogDescription>
            Manage your website connection settings and webhook configuration
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>General settings for your website connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Connection Name</Label>
                  <Input
                    id="name"
                    value={config.name}
                    onChange={(e) => setConfig({...config, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={config.url}
                    onChange={(e) => setConfig({...config, url: e.target.value})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Connection</Label>
                    <p className="text-sm text-gray-500">Allow this website to send events</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleTestConnection} disabled={isTesting}>
                    {isTesting ? "Testing..." : "Test Connection"}
                  </Button>
                  {testResult && (
                    <div className="flex items-center gap-2">
                      {testResult === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className={testResult === "success" ? "text-green-600" : "text-red-600"}>
                        {testResult === "success" ? "Connection successful" : "Connection failed"}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>Configure how your website sends events to our system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhookUrl"
                      value={config.webhookUrl}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button 
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(config.webhookUrl);
                        toast.success("Webhook URL copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Add this URL to your website's webhook configuration
                  </p>
                </div>

                <div>
                  <Label htmlFor="timeout">Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={config.timeout}
                    onChange={(e) => setConfig({...config, timeout: parseInt(e.target.value)})}
                    min="5"
                    max="300"
                  />
                </div>

                <div>
                  <Label htmlFor="customHeaders">Custom Headers (JSON)</Label>
                  <Textarea
                    id="customHeaders"
                    value={config.customHeaders}
                    onChange={(e) => setConfig({...config, customHeaders: e.target.value})}
                    placeholder='{"Authorization": "Bearer token", "X-Custom": "value"}'
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Retries</Label>
                    <p className="text-sm text-gray-500">Retry failed webhook deliveries</p>
                  </div>
                  <Switch 
                    checked={config.enableRetries}
                    onCheckedChange={(checked) => setConfig({...config, enableRetries: checked})}
                  />
                </div>

                {config.enableRetries && (
                  <div>
                    <Label htmlFor="maxRetries">Max Retries</Label>
                    <Input
                      id="maxRetries"
                      type="number"
                      value={config.maxRetries}
                      onChange={(e) => setConfig({...config, maxRetries: parseInt(e.target.value)})}
                      min="1"
                      max="10"
                    />
                  </div>
                )}

                <Button onClick={handleWebhookTest} variant="outline">
                  Send Test Webhook
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Configuration</CardTitle>
                <CardDescription>Choose which events this website can trigger</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(config.allowedEvents).map(([event, enabled]) => (
                  <div key={event} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="capitalize">{event.replace('_', ' ')}</Label>
                      <p className="text-sm text-gray-500">
                        {event === 'user_signup' && "Triggered when a new user registers"}
                        {event === 'user_login' && "Triggered when a user logs in"}
                        {event === 'order_created' && "Triggered when a new order is placed"}
                        {event === 'form_submitted' && "Triggered when a form is submitted"}
                        {event === 'payment_completed' && "Triggered when a payment is processed"}
                      </p>
                    </div>
                    <Switch 
                      checked={enabled}
                      onCheckedChange={(checked) => setConfig({
                        ...config,
                        allowedEvents: { ...config.allowedEvents, [event]: checked }
                      })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring & Logging</CardTitle>
                <CardDescription>Configure monitoring and logging for this connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Detailed Logging</Label>
                    <p className="text-sm text-gray-500">Log all webhook requests and responses</p>
                  </div>
                  <Switch 
                    checked={config.enableLogging}
                    onCheckedChange={(checked) => setConfig({...config, enableLogging: checked})}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-gray-600">Total Events</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">145ms</div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionConfig;
