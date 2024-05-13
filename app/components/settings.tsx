import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Sheet, SheetTrigger } from '@components/ui/sheet';

function Settings () {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SettingsIcon size={28} strokeWidth={2.25} />
      </SheetTrigger>
    </Sheet>
  );
}

export default Settings;
