import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LeadCaptureModalProps {
  open: boolean;
  onSuccess: (lead: { firstName: string; lastName: string }) => void;
  onOpenChange: (open: boolean) => void;
}

export default function LeadCaptureModal({
  open,
  onSuccess,
  onOpenChange,
}: LeadCaptureModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSuccess({ firstName: firstName.trim(), lastName: lastName.trim() });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">Unlock Your Free Worksheet</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            See exactly how much you could save — personalized numbers, no credit check, no
            commitment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Jane"
                value={firstName}
                autoFocus
                className="h-11"
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                }}
              />
              {errors.firstName && (
                <p className="text-destructive text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Smith"
                value={lastName}
                className="h-11"
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
                }}
              />
              {errors.lastName && (
                <p className="text-destructive text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-accent hover:bg-accent/90 text-white font-semibold text-base"
          >
            View My Worksheet →
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Licensed in AZ, CO, TX, FL, OR, WA, MN, MI, PA · NMLS #1912347
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
