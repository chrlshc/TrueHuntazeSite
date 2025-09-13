'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Sparkles, MessageSquare } from 'lucide-react';

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold">Quick actions</div>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-3">
        <Button className="justify-start" variant="secondary">
          <Megaphone className="mr-2 h-4 w-4" /> Create campaign
        </Button>
        <Button className="justify-start" variant="secondary">
          <Sparkles className="mr-2 h-4 w-4" /> Generate content with AI
        </Button>
        <Button className="justify-start" variant="secondary">
          <MessageSquare className="mr-2 h-4 w-4" /> View messages
        </Button>
      </CardContent>
    </Card>
  );
}

