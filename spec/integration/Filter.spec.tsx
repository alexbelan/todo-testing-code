import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import ue from "@testing-library/user-event";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it("с включенным фильтром", async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });
    const btnFilterNoDoneTask = screen.getByRole("button", {
      name: /не выполненые/i,
    }) as HTMLButtonElement;
    await userEvent.click(btnFilterNoDoneTask);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it("с выключенным фильтром", async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const btnNoFilter = screen.getByRole("button", {
      name: /отключить фильтр/i,
    }) as HTMLButtonElement;
    await userEvent.click(btnNoFilter);
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);
  });

  // показывает когда на кнопку можно нажимать
  // после повторного нажатия на кнопку фильтрации
  it("Кнопки фильтра не активны", async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const btnFilterNoDoneTask = screen.getByRole("button", {
      name: /не выполненые/i,
    }) as HTMLButtonElement;
    const btnNoFilter = screen.getByRole("button", {
      name: /отключить фильтр/i,
    }) as HTMLButtonElement;
    await userEvent.click(btnFilterNoDoneTask);
    expect(btnFilterNoDoneTask.disabled).toBe(true);
    expect(btnNoFilter.disabled).toBe(false);
    await userEvent.click(btnNoFilter);
    expect(btnFilterNoDoneTask.disabled).toBe(false);
    expect(btnNoFilter.disabled).toBe(true);
  });
});
