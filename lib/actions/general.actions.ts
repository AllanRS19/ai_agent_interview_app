"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    const interviews = await db
        .collection('interviews')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {

    const { userId, limit = 20 } = params;

    const interviews = await db
        .collection('interviews')
        .orderBy('createdAt', 'desc')
        .where('finalized', '==', true)
        .where('userId', '!=', userId)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getInterviewById(interviewId: string): Promise<Interview | null> {
    const interview = await db
        .collection('interviews')
        .doc(interviewId)
        .get();

    return interview.data() as Interview || null;
}

export async function createInterviewFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript } = params;
    console.log("This is the information: ", interviewId, userId, transcript);

    console.log('Entered the interview feedback creation function');

    try {
        const formattedTranscript = transcript.map((sentence) => (
            `- ${sentence.role}: ${sentence.content}\n`
        )).join('');

        console.log(formattedTranscript);

        const { output } = await generateText({
            model: google('gemini-2.5-flash'),
            output: Output.object({
                schema: feedbackSchema
            }),
            prompt: `You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
            `,
            system:
                "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories"
        });

        console.log("This is the output: ", output);

        const { totalScore, categoryScores, areasForImprovement, finalAssessment, strengths } = output;

        console.log("These are the details after generating the feedback: ", totalScore, categoryScores, areasForImprovement, finalAssessment, strengths);

        const feedback = await db
            .collection('feedback')
            .add({
                interviewId,
                userId,
                totalScore,
                categoryScores,
                strengths,
                areasForImprovement,
                finalAssessment,
                createdAt: new Date().toISOString()
            });

        return {
            success: true,
            feedbackId: feedback.id
        }
    } catch (error) {
        console.error('Error saving feedback', error);
        return { sucess: false };
    }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {

    const { interviewId, userId } = params;

    const feedback = await db
        .collection('feedback')
        .where('interviewId', '==', interviewId)
        .where('userId', '==', userId)
        .limit(1)
        .get();

    if (feedback.empty) return null;

    const feedbackDoc = feedback.docs[0];
    return {
        id: feedbackDoc.id,
        ...feedbackDoc.data()
    } as Feedback;

}