import { loadApis } from "../../modules/apis";

import { EventControllerApi } from "../../modules/apis/eventController";
import { AppApi } from "../../modules/apis/app";
import { SettingsApi } from "../../modules/apis/settings";

loadApis([AppApi, EventControllerApi, SettingsApi]);
