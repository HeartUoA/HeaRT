import bodyParser from 'body-parser';
import { Router } from 'express';
import Course from './course.model';

const router = Router();

router.route('/').get(async (_, response) => {
  const courses = await Course.find();
  return response.status(200).json(courses);
});

router.route('/').post(bodyParser.json(), async (request, response) => {
  try {
    const course = new Course(request.body);
    await course.save();
    return response.status(200).json('Course saved!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default router;
