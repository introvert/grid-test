import type { WidgetDefinition } from '../types/widget';

class WidgetRegistry {
  private widgets: Map<string, WidgetDefinition> = new Map();

  register(definition: WidgetDefinition): void {
    this.widgets.set(definition.type, definition);
  }

  get(type: string): WidgetDefinition | undefined {
    return this.widgets.get(type);
  }

  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values());
  }

  getAvailableTypes(): string[] {
    return Array.from(this.widgets.keys());
  }

  unregister(type: string): boolean {
    return this.widgets.delete(type);
  }

  clear(): void {
    this.widgets.clear();
  }
}

export const widgetRegistry = new WidgetRegistry();
