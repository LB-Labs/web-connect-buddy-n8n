
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, Code, Zap, Settings, Globe, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Docs = () => {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of connecting your website",
      items: [
        "Quick Start Guide",
        "Account Setup",
        "First Website Connection",
        "Creating Your First Workflow"
      ]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation",
      items: [
        "Authentication",
        "Webhook Endpoints",
        "Event Types",
        "Response Formats"
      ]
    },
    {
      icon: Zap,
      title: "Workflow Examples",
      description: "Pre-built automation templates",
      items: [
        "Email Notifications",
        "Slack Integrations",
        "Data Processing",
        "Custom Triggers"
      ]
    },
    {
      icon: Settings,
      title: "Configuration",
      description: "Advanced setup and customization",
      items: [
        "Webhook Configuration",
        "Security Settings",
        "Environment Variables",
        "Custom Domains"
      ]
    }
  ];

  const quickStart = [
    {
      step: "1",
      title: "Create Account",
      description: "Sign up for a free account to get started"
    },
    {
      step: "2",
      title: "Connect Website",
      description: "Add your website using our simple connection wizard"
    },
    {
      step: "3",
      title: "Setup Webhooks",
      description: "Configure webhook endpoints in your website"
    },
    {
      step: "4",
      title: "Create Workflows",
      description: "Build automation workflows using our visual editor"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Documentation</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Developer
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Documentation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to integrate and automate your website workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {sections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur cursor-pointer">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <section.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600 hover:text-purple-600 cursor-pointer transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Start Guide</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickStart.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-6 opacity-90">
                Create your free account and connect your first website in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">
                    Start Building <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
                  View API Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Docs;
