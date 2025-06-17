
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Globe, Mail, MessageSquare, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDemo, setActiveDemo] = useState("email");
  const navigate = useNavigate();

  const demos = [
    {
      id: "email",
      title: "Email Automation",
      description: "Automatically send welcome emails when users sign up",
      icon: Mail,
      color: "text-blue-600"
    },
    {
      id: "slack",
      title: "Slack Notifications",
      description: "Send real-time notifications to your team",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      id: "webhook",
      title: "Custom Webhooks",
      description: "Trigger any external service with custom data",
      icon: Globe,
      color: "text-purple-600"
    }
  ];

  const handleTriggerDemo = () => {
    setIsPlaying(true);
    toast.success("Demo workflow triggered! Check the activity log below.");
    
    setTimeout(() => {
      setIsPlaying(false);
      toast.success("Demo completed successfully!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Interactive Demo</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              See It in
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Action</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of automated workflows with our interactive demo.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {demos.map((demo) => (
              <Card 
                key={demo.id} 
                className={`cursor-pointer transition-all border-0 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur ${
                  activeDemo === demo.id ? 'ring-2 ring-purple-600' : ''
                }`}
                onClick={() => setActiveDemo(demo.id)}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <demo.icon className={`h-8 w-8 ${demo.color}`} />
                  </div>
                  <CardTitle>{demo.title}</CardTitle>
                  <CardDescription>{demo.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="mb-12 bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Live Demo Environment</CardTitle>
              <CardDescription className="text-center">
                Trigger a real workflow and see the magic happen
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between text-green-400 font-mono text-sm mb-4">
                  <span>demo-website.com</span>
                  <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
                </div>
                
                <div className="space-y-2 text-left text-gray-300 font-mono text-sm">
                  <div>→ User signup detected</div>
                  {isPlaying && (
                    <>
                      <div className="animate-pulse">→ Triggering workflow...</div>
                      <div className="animate-pulse">→ Sending welcome email...</div>
                      <div className="animate-pulse">→ Posting to Slack channel...</div>
                      <div className="animate-pulse">→ Updating CRM records...</div>
                    </>
                  )}
                  {!isPlaying && (
                    <div className="text-green-400">✓ Ready to trigger workflow</div>
                  )}
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={handleTriggerDemo}
                disabled={isPlaying}
              >
                {isPlaying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Trigger Demo Workflow
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Own?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Start automating your workflows today with our free plan.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => navigate('/register')}
            >
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
