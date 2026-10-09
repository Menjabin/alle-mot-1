import { supabase } from "../lib/supabase";

/**
 * Deactivate the game.
 */
export const deactivate = async () => {
  await supabase.from("game").update({ value: false }).match({ id: "active" });
};

/**
 * Activate the game.
 */
export const activate = async () => {
  await supabase.from("active").update({ value: true }).match({ id: "active" });
};

/**
 * Activate the game.
 */
export const getActive = async () => {
  const { data, error } = await supabase
    .from("game")
    .select()
    .limit(1)
    .single();

  if (error) throw error;

  return data;
};

/**
 * Get the currently active question.
 */
export const getActiveQuestion = async () => {
  const { data, error } = await supabase
    .from("question")
    .select()
    .eq("active", true)
    .limit(1)
    .single();

  if (error) throw error;

  return data;
};

/**
 * Set the currently active question.
 */
export const setActiveQuestion = async (question) => {
  await supabase
    .from("question")
    .update({ active: true })
    .match({ id: question.id });

  await supabase
    .from("question")
    .update({ active: false })
    .neq("id", question.id);

  await supabase.from("game").update({ value: true }).match({ id: "active" });
};

/**
 * Reorder the questions
 */
export const updateQuestionOrder = async (questions) => {
  if (!questions) return;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    await supabase
      .from("question")
      .update({ sort: i + 1 })
      .match({ id: question.id });
  }
};

/**
 * Update the given question in firebase with its new attributes.
 */
export const updateQuestion = async (question) => {
  const { data, error } = await supabase
    .from("question")
    .upsert(question, { onConflict: "id" });

  if (error) throw error;

  return data;
};

/**
 * Delete the given question.
 */
export const deleteQuestion = async (questionId) => {
  const { data, error } = await supabase
    .from("question")
    .delete()
    .eq("id", questionId);

  if (error) throw error;

  return data;
};

/**
 * Get all questions.
 */
export const getQuestions = async () => {
  const { data, error } = await supabase
    .from("question")
    .select()
    .order("sort");

  if (error) throw error;

  return data;
};

/**
 * Retrieve all answers from the database.
 */
export const getAnswers = async () => {
  const { data, error } = await supabase
    .from("answer")
    .select()
    .neq("id", "contestant");

  if (error) throw error;

  return data;
};

/**
 * Submit an answer for the active question.
 */
export const setAnswer = async (id, value) => {
  const { data, error } = await supabase
    .from("answer")
    .upsert({ id: id, value: value }, { onConflict: "id" });

  if (error) throw error;

  return data;
};

/**
 * Get the contestant answer for the active question.
 */
export const getContestantAnswer = async () => {
  const { data, error } = await supabase
    .from("answer")
    .select()
    .eq("id", "contestant")
    .limit(1)
    .single();

  if (error) throw error;

  return data;
};

/**
 * Submit a contestant answer for the active question.
 */
export const setContestantAnswer = async (value) => {
  const { data, error } = await supabase
    .from("answer")
    .upsert({ id: "contestant", value: value }, { onConflict: "id" });

  if (error) throw error;

  return data;
};

/**
 * Delete all answers. Done whenever the active question changes.
 */
export const deleteAnswers = async () => {
  const { data, error } = await supabase.from("answer").delete().neq("id", -1); // No answer has ID -1, so this will delete everything

  if (error) throw error;

  return data;
};
