const pool = require("../database")

/* ****************************** */
/* REGISTER NEW CLIENT */
/* ****************************** */

async function registerClient (
    client_firstname,
    client_lastname,
    client_email,
    client_password
) {
    try {
        const sql = 
        "INSERT INTO client (client_firstname, client_lastname, client_email, client_password, client_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
        return await pool.query(sql, [
            client_firstname,
            client_lastname,
            client_email,
            client_password
        ])
    } catch (error) {
        return error.message
    }
}

/* ****************************** */
/* CHECK FOR EXISTING EMAIL */
/* ****************************** */
async function checkExistingEmail(client_email){
    try {
      const sql = "SELECT * FROM client WHERE client_email = $1"
      const email = await pool.query(sql, [client_email])
      return email.rowCount
    } catch (error) {
      return error.message
    }
  }

  /* ****************************** */
/* CHECK FOR EXISTING PASSWORD */
/* ****************************** */
async function checkExistingPassword(client_password){
    try {
      const sql = "SELECT * FROM client WHERE client_password = $1"
      const password = await pool.query(sql, [client_password])
      return password.rowCount
    } catch (error) {
      return error.message
    }
  }

/* *****************************
* Return client data using email address
* ***************************** */
async function getClientByEmail (client_email) {
  try {
    const result = await pool.query(
      'SELECT client_firstname, client_lastname, client_email, client_type, client_password FROM client WHERE client_email = $1',
      [client_email])
    return result.rows[0]
  } catch (error) {
    console.error(error)
  }
}


module.exports = {registerClient, checkExistingEmail, checkExistingPassword, getClientByEmail}