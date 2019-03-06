import { HttpStatus } from './models/http';
import { environment } from '../environments/environment';
/**
 * All application constant should define here.
 *
 */
export class AppConst {
    /**  API base URL with port | Dev Env */
    public static readonly AUTH_API_BASE_URL: string = environment.auth_api_base_url;
    public static readonly SUBSCRIBER_API_BASE_URL: string = environment.subscriber_api_base_url;
    public static readonly TESTIMONIAL_API_BASE_URL: string = environment.testimonial_api_base_url;
    public static readonly PROPERTY_ADD_API_BASE_URL: string = environment.property_add_api_base_url;
    public static readonly PROPERTY_API_BASE_URL: string = environment.property_api_base_url;
    public static readonly FLIGHT_API_BASE_URL: string = environment.filght_api_base_url;
    public static readonly PROFILE_API_BASE_URL: string = environment.auth_api_base_url;

    public static readonly BANNER_API_BASE_URL: string = environment.banner_api_base_url;


    /**  Data encryption secret key */
    public static readonly ENC_KEY: string = '!oraStay@ora!#';
    /**  API key */
    public static readonly API_KEY: string = '';
    /** Enviromental variable */
    public static readonly ENV_VARIABLE: string = 'development';

    /**  server HTTP header status code */
    public static readonly HTTP_STATUS: HttpStatus = {
        OK: 200,
        BAD_REQUEST: 400,
        UN_AUTHORIZED: 401,
        NOT_FOUND: 404,
        SERVER_INTERNAL_ERROR: 500
    };

}
