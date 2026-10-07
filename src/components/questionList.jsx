import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { QuestionRow } from "../components/questionRow";
import { updateQuestionOrder } from "../utils/fetching";

export const QuestionList = ({ active, questions, changeActive }) => {
  const [items, setItems] = useState(questions);

  const queryClient = useQueryClient();

  // Keep local ordering in sync when questions are refetched.
  useEffect(() => {
    setItems(questions);
  }, [questions]);

  const reorderMutation = useMutation({
    mutationFn: updateQuestionOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-questions"],
      });
    },
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setItems((currentItems) => {
      const oldIndex = currentItems.findIndex((item) => item.id === active.id);

      const newIndex = currentItems.findIndex((item) => item.id === over.id);

      const reordered = arrayMove(currentItems, oldIndex, newIndex);

      // Persist the new order
      reorderMutation.mutate(reordered);

      return reordered;
    });
  };

  return (
    <div className="w-4/5 my-7 mx-auto overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <p className="text-current my-5">
        <b>Spørsmålsoversikt</b>
      </p>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-50 text-current text-center text-xs font-medium uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Gjør aktiv
              </th>
              <th scope="col" className="px-6 py-3">
                Nummer
              </th>
              <th scope="col" className="px-6 py-3">
                Spørsmål
              </th>
              <th scope="col" className="px-6 py-3">
                Svar
              </th>
              <th scope="col" className="px-6 py-3">
                Lav
              </th>
              <th scope="col" className="px-6 py-3">
                Høy
              </th>
              <th scope="col" className="px-6 py-3">
                Lagre
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="ivide-y divide-slate-200">
            <SortableContext
              items={items.map((question) => question.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((question) => (
                <QuestionRow
                  key={question.id}
                  question={question}
                  changeActive={changeActive}
                  active={active}
                  questions={items}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
};
