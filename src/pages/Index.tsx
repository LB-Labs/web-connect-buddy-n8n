
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Workflow, Globe, Zap, Shield, BarChart, Clock, Code, Database, Mail, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const workflowSteps = [
    {
      step: "1",
      title: "Connect Your Website",
      description: "Add our simple JavaScript snippet to your website to start capturing events.",
      icon: Code
    },
    {
      step: "2", 
      title: "Design Your Workflow",
      description: "Use our visual editor to create automation workflows with drag-and-drop simplicity.",
      icon: Workflow
    },
    {
      step: "3",
      title: "Automate Everything",
      description: "Watch as your workflows automatically handle user actions, send emails, and update systems.",
      icon: Zap
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart",
      content: "This platform reduced our manual work by 80%. The visual workflow builder is incredibly intuitive.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Developer",
      company: "WebFlow Inc",
      content: "Integration was seamless. We had our first automation running in under 10 minutes.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Operations Manager", 
      company: "GrowthCo",
      content: "The real-time triggers and email automation have transformed how we handle customer onboarding.",
      rating: 5
    }
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting newsletter subscription:", { email });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'homepage_newsletter',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success("Thank you for subscribing to our newsletter!");
        setEmail("");
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Automate</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make website automation simple, secure, and scalable for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
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
        </div>
      </section>

      {/* Visual Workflow Editor Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">Visual Editor</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Create Workflows with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Drag & Drop</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Design complex automation workflows using our intuitive visual editor. No coding required.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Workflow Canvas</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <Globe className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Website Trigger</div>
                      <div className="text-sm text-gray-600">Form submission detected</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <Mail className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Send Email</div>
                      <div className="text-sm text-gray-600">Welcome email template</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <Database className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Update CRM</div>
                      <div className="text-sm text-gray-600">Add to contact list</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
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
              Start Building Workflows <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Loved by
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Thousands</span>
            </h2>
            <p className="text-xl text-gray-600">See what our customers are saying about their automation success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-700 text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get the latest updates on new features, automation tips, and success stories.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
