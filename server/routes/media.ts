import multer from 'multer';
import { Request, Response, Router } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

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

router.post(
  '/photo',
  upload.single('photo'),
  async (req: Request, res: Response) => {
    if (!req.file) return res.json({ image: null });
    const image = req.file;

    await sharp(req.file.path)
      .resize(700)
      .toFile(path.resolve('images', 'resized' + image.filename));
    fs.unlinkSync(req.file.path);

    return res.json({
      image: 'http://localhost:4000/images/' + 'resized' + image.filename,
    });
  }
);

export default router;
