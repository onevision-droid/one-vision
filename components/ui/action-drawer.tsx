"use client";

import * as React from"react";
import { Drawer as VaulDrawer } from"vaul";
import { X } from"lucide-react";


type ActionDrawerProps = React.ComponentProps<typeof VaulDrawer.Root> & {
 trigger: React.ReactNode;
 title: string;
 description?: string;
 children: React.ReactNode;
};

export function ActionDrawer({
 trigger,
 title,
 description,
 children,
 ...props
}: ActionDrawerProps) {
 return (
 <VaulDrawer.Root direction="right" {...props}>
 <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>
 
 <VaulDrawer.Portal>
 <VaulDrawer.Overlay className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 transition-opacity" />
 
 <VaulDrawer.Content className="bg-muted border-l border-border flex flex-col h-full w-full sm:w-125 mt-24 fixed bottom-0 right-0 z-50 shadow-2xl focus:outline-none">
 {/* Header */}
 <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
 <div>
 <VaulDrawer.Title className="font-sans text-heading-sm font-medium text-foreground">
 {title}
 </VaulDrawer.Title>
 {description && (
 <VaulDrawer.Description className="text-body-sm text-muted-foreground mt-1">
 {description}
 </VaulDrawer.Description>
 )}
 </div>
 
 <VaulDrawer.Close className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
 <X className="size-5" />
 </VaulDrawer.Close>
 </div>
 
 {/* Content Scrollable Area */}
 <div className="p-6 flex-1 overflow-y-auto">
 {children}
 </div>
 </VaulDrawer.Content>
 </VaulDrawer.Portal>
 </VaulDrawer.Root>
 );
}
