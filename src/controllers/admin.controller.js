import jwt from "jsonwebtoken";
import connection from "../config/db.js";
export const AddUser = async (req, res) => {
  try {
    console.log(req.body);
    const { err } = req.body;

    if (err) {
      return res.status(400).send({ message: "Invalid data" });
    }
    let { username, password, confirmPassword } = req.body;

    if (!(password == confirmPassword)) {
      return res.status(400).send({ message: "Passwords must match" });
    }

    connection.query(
      `SELECT * FROM user WHERE username='${username}' AND password='${password}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          res.status(400).json({ error: "User already exists." });
        }
      }
    );

    connection.query(
      `INSERT INTO user(username, password) VALUES('${username}', '${password}')`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res.json(results);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res) => {
  try {
    //1.Validate body
    const { err } = req.body;
    if (err) {
      return res.status(400).send({ message: "Bad request" });
    }

    let { username } = req.body;
    let { password } = req.body;
    console.log(password);
    //2.Check db for such a user
    connection.query(
      `SELECT * FROM user WHERE username='${username}' AND password='${password}'`,
      async (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length === 0) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        const user = results[0];

        // Generate a JWT token
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
          { id: user.id, username: user.username },
          jwtSecret,
          {
            expiresIn: "1h",
          }
        );

        return res
          .status(200)
          .send({ data: token, message: "Logged in successfully" });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const GetDep = async (req, res) => {
  try {
    connection.query(`SELECT * FROM departments`, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      return res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};


export const GetAll = async (req, res) => {
  try {
    connection.query(`SELECT e.id, e.fname, e.lname, e.NID, e.telephone, e.email, d.department_name, p.position, man.company_name, mod.model, lap.sn FROM employee e, departments d, positions p, laptop_manufacturers man, laptop_models mod, laptops lap WHERE lap.id=e.sn`, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      return res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};
