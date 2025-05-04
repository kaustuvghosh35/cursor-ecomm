import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    googleAuth(): void;
    googleAuthCallback(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    adminRoute(): {
        message: string;
    };
}
