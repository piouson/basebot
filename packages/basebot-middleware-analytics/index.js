import ua from 'universal-analytics'
import findIndex from 'lodash/findIndex'
const gaID = process.env.GOOGLE_ANALYTICS_ACCOUNT_ID

export const models = {
  interactions_daily_aggregation: {
    hash: 'date'
  },
  interactions_weekly_aggregation: {
    hash: 'date'
  },
  interactions_monthly_aggregation: {
    hash: 'date'
  },
  interactions_yearly_aggregation: {
    hash: 'date'
  }
}

export default ({ logger, storage }) => async(bot, message, next) => {
  logger = logger || (() => console.log)
  const debug = logger('middleware:analytics', 'debug')

  // rollup interaction data
  if (message.type === 'message_received') {
    aggregateInteractions(storage, message)
  }

  // send to GA
  if (gaID) {
    const visitor = ua(accountId, message.user)
    debug('sending utterance event')
    visitor.event('Utterance', message.text).send()
  }
  next()
}

async function aggregateInteractions(storage, message) {
  const periods = [
    { table: storage.interactions_daily_aggregation, date: new Date().setHours(0, 0, 0, 0) },
    { table: storage.interactions_weekly_aggregation, date: getStartOfWeek() },
    { table: storage.interactions_monthly_aggregation, date: getStartOfMonth() },
    { table: storage.interactions_yearly_aggregation, date: getStartOfYear() }
  ]
  periods.forEach(period => handleAggregation(period.table, period.date, message))
}

async function handleAggregation(table, date, message) {
  const currentItem = await table.get(date)
  const users = currentItem ? currentItem.users : []
  const userIndex = findIndex(users, { userId: message.user })
  if (userIndex < 0) {
    users.push({
      userId: message.user,
      device: message.device
    })
  }
  table.save({
    date,
    users,
    total: currentItem ? currentItem.total + 1 : 1
  })
}

function getStartOfWeek(d = new Date()) {
  d = new Date(d)
  var day = d.getDay()
  var diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff)).setHours(0, 0, 0, 0)
}

function getStartOfMonth(d = new Date()) {
  return new Date(d.setDate(1)).setHours(0, 0, 0, 0)
}

function getStartOfYear(d = new Date()) {
  return new Date(d.setMonth(0, 1)).setHours(0, 0, 0, 0)
}