import { rule, shield, and, or, not } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null
  },
)

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'admin'
  },
)

const isEditor = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'editor'
  },
)

const permissions = shield({
  Query: {
    frontPage: not(isAuthenticated),
    fruits: and(isAuthenticated, or(isAdmin, isEditor)),
    customers: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    addFruitToBasket: isAuthenticated,
  },
  Fruit: isAuthenticated,
  Customer: isAdmin,
})

export default permissions;


// Uncomment the comments below to see the number of executions of each rule.
// Magic, right!

// To see the effect with no cache, set { cache: false } in isCustomer rule.

// export function getUserEmail(ctx: any): any {
//   const Authorization = ctx.request.get('Authorization')
//   if (Authorization) {
//     const email = Authorization.replace('Bearer ', '')
//     return email
//   }
//   return null
// }

// const isGrocer = rule({ cache: 'contextual' })(
//   async (_parent, _args, ctx, _info) => {
//     // console.log('SHIELD: IsGrocer?')

//     const email = getUserEmail(ctx)
//     return ctx.db.exists.Grocer({ email })
//   },
// )

// const isCustomer = rule({ cache: 'contextual' })(
//   async (_parent, _args, ctx, _info) => {
//     // console.log('SHIELD: IsCustomer?')

//     const email = getUserEmail(ctx)
//     return ctx.db.exists.Customer({ email })
//   },
// )

// const isAuthenticated = or(isCustomer, isGrocer)

// const rules = {
//   isAuthenticated,
//   isCustomer,
//   isGrocer
// }

// // Permissions

// export const permissions = shield({
//   Query: {
//     viewer: rules.isCustomer,
//   },
//   Mutation: {
//     addItemToBasket: rules.isCustomer,
//     removeItemFromBasket: rules.isCustomer,
//     addProduct: rules.isGrocer,
//     removeProduct: rules.isGrocer,
//   },
//   Product: {
//     price: rules.isAuthenticated,
//   },
// })
