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
    <div className="w-4/5 mx-auto">
      <p>
        <b>Spørsmålsoversikt</b>
      </p>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2">Gjør aktiv</th>
              <th className="p-2">Nummer</th>
              <th className="p-2">Spørsmål</th>
              <th className="p-2">Svar</th>
              <th className="p-2">Lav</th>
              <th className="p-2">Høy</th>
              <th className="p-2">Lagre</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
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
