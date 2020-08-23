async function checkRole(req, res, next) {
  //Check the role in the payload
  const {role} = req.user;

  if (role === "Admin") {
    next();
  } else {
    return res.status(403).send({ message: "Only Admins can view all stories and make changes to it" });
  }
}

export default checkRole;
