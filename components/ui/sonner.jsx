"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
<<<<<<< HEAD
    <Sonner
=======
    (<Sonner
>>>>>>> dff3423471125d1d1686cae3ce7cf60676cae682
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)"
        }
      }
<<<<<<< HEAD
      {...props} />
=======
      {...props} />)
>>>>>>> dff3423471125d1d1686cae3ce7cf60676cae682
  );
}

export { Toaster }
