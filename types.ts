
export interface ActionItem {
  who: string;
  what: string;
  when: string;
  where?: string;
}

export interface AnalysisResult {
  summary: string[];
  actionItems: ActionItem[];
}