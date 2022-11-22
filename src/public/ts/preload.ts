import { loadApis } from "../../modules/apis";

import { EventControllerAPI } from "../../modules/apis/eventController";
import { AppAPI } from "../../modules/apis/app";

loadApis([AppAPI, EventControllerAPI]);
