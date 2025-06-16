
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Connect = () => {
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteUrl: "",
    platform: "",
    webhookEvents: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate connection setup
    setTimeout(() => {
      toast.success("Website connected successfully!");
      navigate('/dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Connect Your Website</h1>
          <p className="text-gray-600 mt-2">Set up a new website connection to start automating workflows</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Website Details</CardTitle>
            <CardDescription>
              Provide information about your website and how you want to connect it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="websiteName">Website Name</Label>
                  <Input
                    id="websiteName"
                    name="websiteName"
                    required
                    value={formData.websiteName}
                    onChange={handleChange}
                    placeholder="My Awesome Website"
                  />
                </div>
                
                <div>
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="platform">Platform/CMS</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your website platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wordpress">WordPress</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                    <SelectItem value="custom">Custom/Other</SelectItem>
                    <SelectItem value="react">React/Next.js</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="webhookEvents">Webhook Events</Label>
                <Input
                  id="webhookEvents"
                  name="webhookEvents"
                  value={formData.webhookEvents}
                  onChange={handleChange}
                  placeholder="e.g., user_signup, purchase_completed, form_submitted"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Comma-separated list of events you want to track
                </p>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what workflows you want to automate..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• We'll generate a unique webhook URL for your website</li>
                  <li>• Add the webhook to your website's configuration</li>
                  <li>• Test the connection to ensure events are received</li>
                  <li>• Start creating workflows in the n8n interface</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect Website"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Connect;
