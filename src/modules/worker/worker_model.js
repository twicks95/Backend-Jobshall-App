const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset, search, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM workers WHERE worker_name LIKE '%${search}%' ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
          console.log(error)
        }
      )
    })
  },
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM workers',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataByid: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM workers where worker_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO workers SET ?',
        setData,
        (error, result) => {
          console.log(error)
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  updateWorker: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE workers SET ? WHERE worker_id = ?',
        [setData, id],
        (error, result) => {
          console.log(error)
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteWorker: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM workers WHERE worker_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
