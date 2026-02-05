import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Badge, Input, Select } from '@/components/ui';
import { Download } from 'lucide-react';

const selectOptions = [
  { value: '', label: 'Choose an option' },
  { value: 'intaker', label: 'Intaker' },
  { value: 'forms', label: 'Forms' },
  { value: 'callrail', label: 'CallRail' },
  { value: 'manual', label: 'Manual' },
];

export function DesignSystem() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Design System</h1>
          <p className="text-[var(--text-secondary)]">Reusable components and tokens for a cohesive UI</p>
        </div>
        <Button variant="outline">
          <Download size={16} />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Buttons</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Icon Button">★</Button>
        </CardContent>
        <CardFooter className="text-[var(--text-muted)]">
          Buttons support keyboard focus, accessible contrast, and disabled states.
        </CardFooter>
      </Card>

      <Card>
        <CardHeader><CardTitle>Icon Spacing</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-[var(--text-secondary)]">Icons used inline must maintain at least 8px spacing from adjacent content.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download size={16} /> Download</Button>
            <Badge variant="outline"><Download size={12} /> With Badge</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Badges</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="purple">Purple</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Form Inputs</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" placeholder="Jane Doe" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Select label="Source" options={selectOptions} defaultValue="" />
          <Select label="With Error" options={selectOptions} defaultValue="" error="Selection required" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Cards</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4">
              <h3 className="text-lg font-semibold">Standard Card</h3>
              <p className="text-[var(--text-secondary)]">Used for grouping related content.</p>
            </Card>
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold">Legacy Class</h3>
              <p className="text-[var(--text-secondary)]">Mapped to the new clean style.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
