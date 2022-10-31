import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('requested patients');
  res.send([]);
});

router.post('/', (req, res) => {
  console.log('add new patient');
  res.send({});
});

export default router;