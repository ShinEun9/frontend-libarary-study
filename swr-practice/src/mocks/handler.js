import { rest } from "msw";

export const handler = [
  rest.get("http://localhost:3000/api/user/:userId", async (req, res, ctx) => {
    const { userId } = req.params;
    // const id = req.url.searchParams.get('id');
    // const {value} = req.body;
    // return res(ctx.status(404));
    return res(
      ctx.json({
        name: `eunsu  ${userId}`,
      })
    );
  }),
];
