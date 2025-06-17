
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Pause, Edit, Trash2, Plus, Settings, Activity } from "lucide-react";
import { toast } from "sonner";

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused';
  executions: number;
  lastRun: string;
}

const WorkflowManager = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Welcome Email Automation',
      description: 'Send welcome email when user signs up',
      trigger: 'user_signup',
      action: 'send_email',
      status: 'active',
      executions: 156,
      lastRun: '2 hours ago'
    },
    {
      id: '2',
      name: 'Slack Order Notifications',
      description: 'Notify team in Slack when new order is placed',
      trigger: 'order_created',
      action: 'slack_message',
      status: 'active',
      executions: 89,
      lastRun: '5 minutes ago'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: '',
    action: ''
  });

  const handleCreateWorkflow = async () => {
    if (!newWorkflow.name || !newWorkflow.trigger || !newWorkflow.action) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    console.log("Creating workflow:", newWorkflow);

    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newWorkflow,
          userId: localStorage.getItem('userId') || 'demo-user',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const createdWorkflow = await response.json();
        
        const workflow: Workflow = {
          id: createdWorkflow.id || Date.now().toString(),
          name: newWorkflow.name,
          description: newWorkflow.description,
          trigger: newWorkflow.trigger,
          action: newWorkflow.action,
          status: 'active',
          executions: 0,
          lastRun: 'Never'
        };

        setWorkflows([...workflows, workflow]);
        setNewWorkflow({ name: '', description: '', trigger: '', action: '' });
        setIsCreateOpen(false);
        toast.success("Workflow created successfully!");
      } else {
        throw new Error('Failed to create workflow');
      }
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast.error("Failed to create workflow. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleWorkflowStatus = async (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow) return;

    const newStatus = workflow.status === 'active' ? 'paused' : 'active';

    try {
      const response = await fetch(`/api/workflows/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          userId: localStorage.getItem('userId') || 'demo-user',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setWorkflows(workflows.map(w => 
          w.id === id 
            ? { ...w, status: newStatus }
            : w
        ));
        toast.success(`Workflow ${newStatus === 'active' ? 'activated' : 'paused'} successfully!`);
      } else {
        throw new Error('Failed to update workflow status');
      }
    } catch (error) {
      console.error("Error updating workflow status:", error);
      toast.error("Failed to update workflow status.");
    }
  };

  const deleteWorkflow = async (id: string) => {
    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId') || 'demo-user',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setWorkflows(workflows.filter(w => w.id !== id));
        toast.success("Workflow deleted successfully!");
      } else {
        throw new Error('Failed to delete workflow');
      }
    } catch (error) {
      console.error("Error deleting workflow:", error);
      toast.error("Failed to delete workflow.");
    }
  };

  const testWorkflow = async (workflow: Workflow) => {
    try {
      const response = await fetch(`/api/workflows/${workflow.id}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId: workflow.id,
          testData: {
            trigger: workflow.trigger,
            action: workflow.action
          },
          userId: localStorage.getItem('userId') || 'demo-user',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success(`Testing workflow: ${workflow.name}`);
        
        // Update execution count
        setWorkflows(workflows.map(w => 
          w.id === workflow.id 
            ? { ...w, executions: w.executions + 1, lastRun: 'Just now' }
            : w
        ));

        setTimeout(() => {
          toast.success("Test completed successfully!");
        }, 2000);
      } else {
        throw new Error('Test failed');
      }
    } catch (error) {
      console.error("Error testing workflow:", error);
      toast.error("Test failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Workflows</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>
                Set up a new automation workflow for your website.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Workflow Name *</Label>
                <Input
                  id="name"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                  placeholder="e.g., Welcome Email"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                  placeholder="Describe what this workflow does..."
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="trigger">Trigger Event *</Label>
                <Select value={newWorkflow.trigger} onValueChange={(value) => setNewWorkflow({...newWorkflow, trigger: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user_signup">User Signup</SelectItem>
                    <SelectItem value="order_created">Order Created</SelectItem>
                    <SelectItem value="form_submitted">Form Submitted</SelectItem>
                    <SelectItem value="payment_completed">Payment Completed</SelectItem>
                    <SelectItem value="user_login">User Login</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="action">Action *</Label>
                <Select value={newWorkflow.action} onValueChange={(value) => setNewWorkflow({...newWorkflow, action: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="send_email">Send Email</SelectItem>
                    <SelectItem value="slack_message">Send Slack Message</SelectItem>
                    <SelectItem value="webhook">Call Webhook</SelectItem>
                    <SelectItem value="update_crm">Update CRM</SelectItem>
                    <SelectItem value="sms">Send SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleCreateWorkflow} 
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Creating..." : "Create Workflow"}
                </Button>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {workflows.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No workflows yet</h3>
          <p className="text-gray-600 mb-6">Create your first workflow to start automating</p>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={() => setIsCreateOpen(true)}
          >
            Create Your First Workflow
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {workflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {workflow.name}
                      <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{workflow.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => testWorkflow(workflow)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleWorkflowStatus(workflow.id)}
                    >
                      {workflow.status === 'active' ? 
                        <Pause className="h-4 w-4" /> : 
                        <Play className="h-4 w-4" />
                      }
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteWorkflow(workflow.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Trigger:</span>
                    <p className="text-gray-600 capitalize">{workflow.trigger.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Action:</span>
                    <p className="text-gray-600 capitalize">{workflow.action.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Executions:</span>
                    <p className="text-gray-600">{workflow.executions}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Last Run:</span>
                    <p className="text-gray-600">{workflow.lastRun}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkflowManager;
