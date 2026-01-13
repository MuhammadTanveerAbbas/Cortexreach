'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Grid3x3,
  List,
  Star,
  Clock,
  Trash2,
  Download,
  Mail,
  Copy,
  Eye,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SavedEmail = {
  subject: string;
  body: string;
  prospectName: string;
  timestamp: string;
  favorite?: boolean;
};

export default function SavedTab() {
  const [emails, setEmails] = useState<SavedEmail[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<SavedEmail[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'favorites' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<SavedEmail | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadEmails();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [emails, filter, searchQuery]);

  const loadEmails = () => {
    const saved = JSON.parse(localStorage.getItem('cortexreach_emails') || '[]');
    setEmails(saved.reverse());
  };

  const applyFilters = () => {
    let filtered = [...emails];

    if (filter === 'favorites') {
      filtered = filtered.filter((e) => e.favorite);
    } else if (filter === 'recent') {
      filtered = filtered.slice(0, 10);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (e) =>
          e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.prospectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEmails(filtered);
  };

  const toggleFavorite = (index: number) => {
    const updated = [...emails];
    updated[index].favorite = !updated[index].favorite;
    setEmails(updated);
    localStorage.setItem('cortexreach_emails', JSON.stringify(updated.reverse()));
  };

  const deleteEmail = (index: number) => {
    const updated = emails.filter((_, i) => i !== index);
    setEmails(updated);
    localStorage.setItem('cortexreach_emails', JSON.stringify(updated.reverse()));
    toast({ title: '🗑️ Deleted', description: 'Email removed from saved items.' });
  };

  const copyEmail = (email: SavedEmail) => {
    const text = `Subject: ${email.subject}\n\n${email.body.replace(/<[^>]*>/g, '\n')}`;
    navigator.clipboard.writeText(text);
    toast({ title: '✅ Copied!', description: 'Email copied to clipboard.' });
  };

  const exportEmail = (email: SavedEmail) => {
    const content = `Subject: ${email.subject}\n\n${email.body.replace(/<[^>]*>/g, '\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Saved Emails</h2>
          <p className="text-sm text-muted-foreground">{emails.length} total emails</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'favorites' ? 'default' : 'outline'}
            onClick={() => setFilter('favorites')}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
          <Button
            variant={filter === 'recent' ? 'default' : 'outline'}
            onClick={() => setFilter('recent')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Recent
          </Button>
        </div>
      </div>

      {/* Email List */}
      {filteredEmails.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-16 text-center">
            <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No saved emails</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'No emails match your search.' : 'Start generating emails to see them here.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          {filteredEmails.map((email, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary/50 transition-all cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-2">{email.subject}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(index);
                    }}
                  >
                    <Star
                      className={`h-4 w-4 ${email.favorite ? 'fill-yellow-500 text-yellow-500' : ''}`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground line-clamp-3">
                  {email.body.replace(/<[^>]*>/g, ' ').substring(0, 150)}...
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>To: {email.prospectName}</span>
                  <span>{new Date(email.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyEmail(email)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportEmail(email)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteEmail(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedEmail(null)}
        >
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>{selectedEmail.subject}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>To: {selectedEmail.prospectName}</span>
                <span>{new Date(selectedEmail.timestamp).toLocaleString()}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                {selectedEmail.body.replace(/<[^>]*>/g, '\n').split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => copyEmail(selectedEmail)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" onClick={() => exportEmail(selectedEmail)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" onClick={() => setSelectedEmail(null)} className="ml-auto">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
