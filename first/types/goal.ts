export interface Goal {
  text: string;
  id: string;
}

export interface GoalInputProps {
  onAddGoal: (enteredGoal: string) => void;
  visible: boolean;
  onCancel: () => void;
}

export interface GoalEditProps {
  visible: boolean;
  onCancel: () => void;
  onEdit: (id: string, newText: string) => void;
  goalText: string;
  goalId: string;
}

export interface GoalItemProps {
  text: string;
  id: string;
  onDelete: (id: string) => void;
  onStartEdit: (id: string, text: string) => void;
}
