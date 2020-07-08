import multer from 'multer';
import { Request, Response, Router } from 'express';

const router = Router();

const upload = multer({
  dest: 'images',
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

router.post('/photo', upload.single('photo'), (req: Request, res: Response) => {
  if (!req.file) return res.json({ image: null });
  const { filename: image } = req.file;

  return res.json({
    image,
  });
});

export default router;
