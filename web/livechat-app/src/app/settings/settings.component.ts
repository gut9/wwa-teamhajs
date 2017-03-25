import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {SettingService} from "../services/setting.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  invitationMessage = 'W czym mogę pomóc ?!';
  invitationMessageControl = new FormControl();
  saving = false;

  constructor(private settingService: SettingService) {
  }

  ngOnInit() {

    this.invitationMessageControl.valueChanges
      .debounceTime(1000)
      .subscribe(newValue => {
        this.invitationMessage = newValue;
        this.saving = true;
        this.settingService.saveInvitationMessage(this.invitationMessage)
          .then(() => this.saving = false);
      });
  }

}
