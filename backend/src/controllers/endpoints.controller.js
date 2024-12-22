import { Endpoint } from '../models/endpoint.model.js';

export const createEndpoint = async (req, res) => {
  try {
    const { name, url, method, interval } = req.body;
    const endpoint = await Endpoint.create({
      name,
      url,
      method,
      interval,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Endpoint created successfully',
      data: endpoint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating endpoint',
    });
  }
};

export const getEndpoints = async (req, res) => {
  try {
    const endpoints = await Endpoint.findByUserId(req.user.id);
    res.json({
      success: true,
      data: endpoints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching endpoints',
    });
  }
};

export const getEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);
    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: 'Endpoint not found',
      });
    }

    if (endpoint.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    res.json({
      success: true,
      data: endpoint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching endpoint',
    });
  }
};

export const updateEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);
    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: 'Endpoint not found',
      });
    }

    if (endpoint.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const updatedEndpoint = await Endpoint.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Endpoint updated successfully',
      data: updatedEndpoint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating endpoint',
    });
  }
};

export const deleteEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);
    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: 'Endpoint not found',
      });
    }

    if (endpoint.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    await Endpoint.delete(req.params.id);
    res.json({
      success: true,
      message: 'Endpoint deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting endpoint',
    });
  }
};
