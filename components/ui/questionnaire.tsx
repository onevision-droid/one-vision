"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface QuestionnaireContextValue {
  activeStep: number
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
}

const QuestionnaireContext = React.createContext<QuestionnaireContextValue | undefined>(undefined)

export function useQuestionnaire() {
  const context = React.useContext(QuestionnaireContext)
  if (!context) {
    throw new Error("useQuestionnaire must be used within a Questionnaire provider")
  }
  return context
}

export function Questionnaire({
  children,
  className,
  initialStep = 1,
  onComplete,
}: {
  children: React.ReactNode
  className?: string
  initialStep?: number
  onComplete?: () => void
}) {
  const [activeStep, setActiveStep] = React.useState(initialStep)

  // Count how many QuestionnaireItem children there are
  const totalSteps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === QuestionnaireItem
  ).length

  const nextStep = React.useCallback(() => {
    if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1)
    } else if (onComplete) {
      onComplete()
    }
  }, [activeStep, totalSteps, onComplete])

  const prevStep = React.useCallback(() => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1)
    }
  }, [activeStep])

  const goToStep = React.useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setActiveStep(step)
    }
  }, [totalSteps])

  return (
    <QuestionnaireContext.Provider value={{ activeStep, totalSteps, nextStep, prevStep, goToStep }}>
      <div className={cn("w-full relative", className)}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === QuestionnaireItem) {
            return React.cloneElement(child as React.ReactElement<React.ComponentProps<typeof QuestionnaireItem>>, { step: index + 1 })
          }
          return child
        })}
      </div>
    </QuestionnaireContext.Provider>
  )
}

export function QuestionnaireItem({
  children,
  step,
  className,
}: {
  children: React.ReactNode
  step?: number
  className?: string
}) {
  const { activeStep } = useQuestionnaire()

  if (step !== activeStep) return null

  return (
    <div
      role="tabpanel"
      className={cn("animate-in fade-in slide-in-from-bottom-4 duration-300", className)}
    >
      {children}
    </div>
  )
}

export function QuestionnaireStepper({ className }: { className?: string }) {
  const { activeStep, totalSteps } = useQuestionnaire()

  return (
    <div className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}>
      <span>
        Step {activeStep} of {totalSteps}
      </span>
    </div>
  )
}

export function QuestionnaireNav({
  className,
  nextLabel = "Next",
  prevLabel = "Back",
  onNext,
  onPrev,
  isNextDisabled = false,
}: {
  className?: string
  nextLabel?: string | React.ReactNode
  prevLabel?: string | React.ReactNode
  onNext?: () => void
  onPrev?: () => void
  isNextDisabled?: boolean
}) {
  const { nextStep, prevStep, activeStep, totalSteps } = useQuestionnaire()

  return (
    <div className={cn("flex items-center justify-between mt-8 pt-4 border-t border-border-subtle", className)}>
      <button
        type="button"
        className="button-quiet text-muted-foreground disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => {
          if (onPrev) onPrev()
          else prevStep()
        }}
        disabled={activeStep === 1}
      >
        {prevLabel}
      </button>
      <button
        type="button"
        className="button-primary"
        onClick={() => {
          if (onNext) onNext()
          else nextStep()
        }}
        disabled={isNextDisabled}
      >
        {activeStep === totalSteps ? "Submit" : nextLabel}
      </button>
    </div>
  )
}
