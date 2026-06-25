import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Public } from './auth/decorators/public.decorator';
import { Request, Response } from 'express';
import { ClientRequest } from 'http';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number | string;
    role: string;
  };
}

@Controller()
export class AppController {
  @Public()
  @All('auth/*path')
  proxyAuth(@Req() req, @Res() res) {
    this.executeProxy('http://auth-service:3001', '/auth', req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('users/*path')
  proxyUsers(@Req() req, @Res() res) {
    this.executeProxy('http://user-service:3002', '/users', req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('pets/*path')
  proxyPets(@Req() req, @Res() res) {
    this.executeProxy('http://pet-service:3003', '/pets', req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('breeds/*path')
  proxyBreeds(@Req() req, @Res() res) {
    this.executeProxy('http://pet-service:3003', '/breeds', req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('vaccine-pet/*path')
  proxyVaccinePet(@Req() req, @Res() res) {
    this.executeProxy('http://vaccine-service:3005', '/vaccine-pet', req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('vaccine-category/*path')
  proxyVaccineCategory(@Req() req, @Res() res) {
    this.executeProxy(
      'http://vaccine-service:3005',
      '/vaccine-category',
      req,
      res,
    );
  }

  @UseGuards(JwtAuthGuard)
  @All('appointment/*path')
  proxyAppointment(@Req() req, @Res() res) {
    this.executeProxy(
      'http://appointment-service:3006',
      '/appointment',
      req,
      res,
    );
  }

  @UseGuards(JwtAuthGuard)
  @All('medical-record/*path')
  proxyMedicalRecord(@Req() req, @Res() res) {
    this.executeProxy(
      'http://medical-record-service:3007',
      '/medical-record',
      req,
      res,
    );
  }

  @UseGuards(JwtAuthGuard)
  @All('nutrition/*path')
  proxyNutrition(@Req() req, @Res() res) {
    this.executeProxy('http://nutrition-service:3008', '/nutrition', req, res);
  }

  @UseGuards(JwtAuthGuard)
  @All('review/*path')
  proxyReview(@Req() req, @Res() res) {
    this.executeProxy('http://review-service:3009', '/review', req, res);
  }

  private executeProxy(
    target: string,
    pathPrefix: string,
    req: Request,
    res: Response,
  ) {
    const authRequest = req as AuthenticatedRequest;

    const proxyOptions: Options = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${pathPrefix}`]: pathPrefix,
      },
      on: {
        proxyReq: (proxyReq: ClientRequest, req: any) => {
          if (authRequest.user) {
            proxyReq.setHeader('x-user-id', String(authRequest.user.id));
            proxyReq.setHeader('x-user-role', String(authRequest.user.role));
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (req.body) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
          }
        },
        error: (err, req, res) => {
          console.error('Proxy Error:', err);
          (res as Response).status(502).json({
            statusCode: 502,
            message: 'Cannot connect to downstream service.',
            error: 'Bad Gateway',
          });
        },
      },
    };

    const proxy = createProxyMiddleware(proxyOptions);
    void proxy(req, res, (err) => {
      if (err) {
        console.error('Proxy Error:', err);
        res.status(502).json({
          statusCode: 502,
          message: 'Cannot connect to downstream service.',
          error: 'Bad Gateway',
        });
      }
    });
  }
}
