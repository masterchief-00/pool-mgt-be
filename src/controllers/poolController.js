import { Pool, User } from "../database/models";
import poolSchema from "../validations/poolSchema";
class PoolController {
  //create pool
  static async createPool(req, res) {
    try {
      const { error } = poolSchema.validate(req.body);
      if (error)
        return res
          .status(400)
          .json({ validationError: error.details[0].message });

      const existingPool = await Pool.findOne({
        where: { name: req.body.name },
      });
      if (existingPool) {
        return res.status(409).json({
          message: "Pool  already exists !!!",
        });
      }

      const newPool = await Pool.create({
        name: req.body.name,
        depth: req.body.depth,
        l: req.body.l,
        w: req.body.w,
        location: req.body.location,
        depth: req.body.depth,
        assigned_to: "",
      });

      return res.status(201).json({
        status: "Success",
        message: "Pool created successfully !!!",
        user: newPool,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  //single Pool
  static async getSinglePool(req, res) {
    try {
      const singlePool = await Pool.findOne(req.params.id);
      if (!singlePool) {
        res.status(404).json({
          status: "fail",
          message: "Pool not found!!!",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: singlePool,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  //get all Pool
  static async getAllPools(req, res) {
    try {
      const pools = await Pool.findAll();
      res.status(200).json({
        status: "success",
        allUsers: pools,
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        error: error.message,
      });
    }
  }
  // Update pool
  static async updatePool(req, res) {
    try {
      const { poolId, newName, newDepth, newLength, newWidth, newLocation } =
        req.body;
      const pool = await Pool.findByPk(poolId);
      if (!pool) {
        return res.status(404).json({
          status: "fail",
          message: "Pool not found",
        });
      }

      pool.name = newName || pool.name;
      pool.depth = newDepth || pool.depth;
      pool.l = newLength || pool.l;
      pool.w = newWidth || pool.w;
      pool.location = newLocation || pool.location;
      await pool.save();

      res.status(200).json({
        status: "success",
        message: "Pool updated successfully",
        pool: pool,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  // Assign user to pool (pool operator)
  static async assignUserToPool(req, res) {
    try {
      const userId = req.query.userId;
      const poolId = req.params.poolId;
      const user = await User.findByPk(userId);
      const pool = await Pool.findByPk(poolId);
      if (!user || !pool) {
        return res.status(404).json({
          status: "fail",
          message: "User or Pool not found",
        });
      }

      pool.assigned_to = userId;
      await pool.save();

      res.status(200).json({
        status: "success",
        message: "User assigned as pool operator",
        pool: pool,
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }
  // Delete pool
  static async deletePool(req, res) {
    try {
      const poolId = req.params.id;
      const pool = await Pool.findByPk(poolId);
      if (!pool) {
        return res.status(404).json({
          status: "fail",
          message: "Pool not found",
        });
      }

      await pool.destroy();

      res.status(200).json({
        status: "success",
        message: "Pool deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }
}

export default PoolController;
