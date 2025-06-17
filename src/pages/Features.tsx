
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Workflow, Globe, Zap, Shield, BarChart, Clock, Code, Database, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Globe,
      title: "Easy Website Integration",
      description: "Connect any website or web application with our simple webhook system. No complex setup required.",
      color: "text-blue-600"
    },
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description: "Create complex automation workflows using our intuitive drag-and-drop interface powered by n8n.",
      color: "text-purple-600"
    },
    {
      icon: Zap,
      title: "Real-time Triggers",
      description: "Instantly trigger workflows when events happen on your website. Perfect for real-time automation.",
      color: "text-yellow-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with encrypted data transmission and secure API key management.",
      color: "text-green-600"
    },
    {
      icon: BarChart,
      title: "Analytics & Monitoring",
      description: "Track workflow performance, success rates, and execution times with detailed analytics.",
      color: "text-red-600"
    },
    {
      icon: Clock,
      title: "Scheduled Workflows",
      description: "Set up time-based triggers to run workflows on specific schedules or intervals.",
      color: "text-indigo-600"
    }
  ];

  const integrations = [
    { name: "Slack", icon: "💬" },
    { name: "Gmail", icon: "✉️" },
    { name: "Shopify", icon: "🛒" },
    { name: "WordPress", icon: "📝" },
    { name: "Stripe", icon: "💳" },
    { name: "Notion", icon: "📋" },
    { name: "Airtable", icon: "📊" },
    { name: "Discord", icon: "🎮" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Features</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Automate</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make website automation simple, secure, and scalable for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect with 200+ Services</h2>
            <p className="text-lg text-gray-600 mb-8">Integrate with all your favorite tools and services</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
              {integrations.map((integration, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="text-3xl mb-2">{integration.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{integration.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => navigate('/register')}
            >
              Start Automating Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
