import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { avatar, ...inputs } = req.body;
  
    // if (id !== tokenUserId) {
    //   return res.status(403).json({ message: "Not Authorized!" });
    // }
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...inputs,
          ...(avatar && { avatar }),
        },
      });
  
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update users!" });
    }
  };
  

  export const searchUsers = async (req, res) => {
    const { query } = req.query; 

    if (!query || query.length < 3) {
        return res.status(400).json({ message: "Search query must be at least 3 characters long." });
    }

    try {
        const matchingProfiles = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: query,
                            mode: 'insensitive' 
                        }
                    },
                    {
                        jobTitle: {
                            contains: query,
                            mode: 'insensitive' 
                        }
                    },
                    {
                        department: {
                            contains: query,
                            mode: 'insensitive' 
                        }
                    },
                    {
                        location: {
                            contains: query,
                            mode: 'insensitive' 
                        }
                    },
                    {
                        shortBio: {
                            contains: query,
                            mode: 'insensitive' 
                        }
                    }
                ]
            }
        });

        res.status(200).json(matchingProfiles);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to search users!" });
    }
};
