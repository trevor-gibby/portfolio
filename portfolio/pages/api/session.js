
import { withSessionRoute } from '@/backend/session'
import { v4 as uuidv4 } from 'uuid';

export default withSessionRoute(
  async (req, res) => {
    const sessionCheck = req.session.uuid
    if (sessionCheck) {
      res.status(200).json(req.session);
    }
    else {
      const uuid = uuidv4()
      req.session.uuid = uuid
      await req.session.save()
      res.status(200).json(req.session);
    }
  }
)