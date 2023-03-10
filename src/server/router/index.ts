import { z } from "zod";
import { procedure, router } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { PokemonClient } from "pokenode-ts";

export const appRouter = router({
  getPokemonById: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return { name: pokemon.name, sprites: pokemon.sprites };
    }),
  castVote: procedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: {
          ...input,
        },
      });
      return { success: true, vote: voteInDb };
    }),
  getAllVotes: procedure.input(z.void()).query(async () => {
    const votes = await prisma.vote.findMany({
      select: {
        votedFor: true,
        votedAgainst: true,
      },
    });
    return votes;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
