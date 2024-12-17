import { users } from "../mockup/user.mockup.js";
import { groups } from "../mockup/groups.mockup.js"

export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return users;
}

export function getSummedAge() {
  const summedAge = users.reduce((accumulator, user) => {
    console.log(user)
    //Age can be a number or "unknown"
    if (parseInt(user.age)) {
    // I added here some console logs to see if statement above work correctly and i change it to parseInt
    // Im not sure it its this topic at stack https://stackoverflow.com/questions/4090518/what-is-the-difference-between-parseint-and-number
    // but parseInt is more restricted than Number personally i almost always use ParseInt
    // and that was the first thing I did here.
    // console.log(user.age)
    // console.log(accumulator)
      return accumulator + user.age;
    } else {
      // we use else return to return current accumulator value
      return accumulator;
    }
  }, 0);
  // console.log(summedAge)
  return { result: `Summed age is ${summedAge}` };
}


export function getUsersIncludingApplications() {
  var result = [];

  users.forEach((user) => {
    // console.log(user.username)
    let userAppNames = [];
    groups.forEach((group) => {
      // console.log(group.members)
      if (group.members.includes(user.username)) {
        userAppNames.push(group.name);
      }
    });
  // So I do a simple double foeEach loop, I guess we can do it using filters and maps. I'll do it if I get enough time.

  //... future me : nope... last task take me too much time
  // console.log(userAppNames)
    result.push({ ...user, applications: userAppNames });
  });
  return result;
}
