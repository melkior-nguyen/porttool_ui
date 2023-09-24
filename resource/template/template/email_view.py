from django.conf import settings
from django.shortcuts import render
from datetime import datetime, timedelta
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings


def send_mail(subject, template_name, context, email=None, attach=None):
    try:
        body = render_to_string(
            template_name,
            context,
        )
        to = [email] if isinstance(email, str) else email
        msg = EmailMessage(subject, body, "info@port.tools", to)
        if attach:
            msg.attach_file(attach)
        msg.content_subtype = "html"
        print(msg.send())
        #print(body)
    except Exception as e:
        print(e)


def email_view(request):
    # verify-account
    context_verify_account = {
        "subject": "Your Account Sign-Up OTP111",
        "user": {
            "full_name": "Jimmy Hung",
        },
        "raw_code": "123456",
        "year":  datetime.now().year
    }
    # 2fa-code
    context_2fa_code = {
        "subject": "Your Two-Factor Authentication Login OTP",
        "user": {
            "full_name": "Jimmy Hung",
        },
        "raw_code": "234145",
        "year":  datetime.now().year
    }
    # forgot-password
    context_forgot_password = {
        "subject": "Password Reset Confirmation OTP",
        "user": {
            "full_name": "Jimmy Hung",
        },
        "raw_code": "023745",
        "year":  datetime.now().year
    }
    # login_on_new_device
    context_login_on_new_device = {
        "subject": "Welcome to Port.Tools on a New Device",
        "user": {
            "full_name": "Jimmy Hung",
        },
        "device": "MacBook Pro",
        "raw_code": "023745",
        # August 20, 2023
        "date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,
    }
    # invite_to_owner
    context_invite_to_owner = {
        "subject": "has invited a Member to Join Project ",
        "project": "port-tools",
        "owner": {
            "name": "Tran Huyen",
        },
       "creator": {
            "name": "Sangto",
            "email": "Sangto@gmail.com"
        },
        "member": {
            "name": "JimmyHung",
            "email": "hung@gmail.com"
        },
        "invite_date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,
    },
    # invite_to_member
    context_invite_to_member = {
       "subject": "You've Been Invited to Join Project",
        "owner": {
            "name": "Tran Huyen",
        },
        "creator": {
            "name": "Sangto",
            "email": "Sangto@gmail.com",
        },
        "member": {
            "name": "JimmyHung",
            "email": "hung@gmail.com",
        },
        "invitation_link": "https://github.com/PortTools/Port.Tools/issues/102",
        "invite_date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,
    }
    # invite_to_creator
    context_invite_to_creator = {
        "subject": "You've Invited a Member to Join Project",
        "project": "ReactJS_SPA",
        "creator": {
            "name": "TranHuyen",
            "email": "huyen@gmail.com"
        },
        "member": {
            "name": "JimmyHung",
            "email": "hung@gmail.com"
        },
        "invite_date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,
    }
    # reply_to_member
    context_reply_to_member = {
        "subject": "Invitation Accepted: You've Joined the Project",
        "project": "ReactJS_SPA",
        "member": {
            "name": "JimmyHung",
            "email": "hung@gmail.com"
        }
    }
    # reply_to_creator
    context_reply_to_creator = {
        "subject": "Invitation Accepted: hung@gmail.com has Joined Your Project",
        "owner": {
            "name": "Tran Huyen",
        },
        "creator": {
            "name": "Tran Huyen",
            "email": "huyen@gmail.com"
        },
        "project": "port-tools",
        "member": {
            "name": "Jimmy Hung",
            "email": "hung@gmail.com"
        },
        "date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,
    }
    # reply_to_owner
    context_reply_to_owner = {
        "subject": "Invitation Accepted: hung@gmail.com has Joined Your Project",
        "owner": {
            "name": "Tran Huyen",
        },
        "creator": {
            "name": "SangTo",
            "email": "SangTo@gmail.com"
        },
        "project": "port-tools",
       "member": {
            "name": "Jimmy Hung",
            "email": "hung@gmail.com"
        },
        "date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,
    }
    # update_project
    context_update_project = {
        "subject": "Your project has been updated successfully",
        "project": "port-tools",
        "updator": {
            "full_name": "Huyen Tran",
            "email": "huyen@gmail.com"
        },
        "project": {
            "owner":{
                "full_name": "Jimmy Hung",
            },
            "name": "ReactJS_SPA",
            "created" : (datetime.now() - timedelta(days=7)).strftime("%B %d, %Y")
        },
        "info_updated": {
            "name": "ReactJS_SPA_Smart",
            "date": datetime.now().strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # create_project
    context_create_project = {
        "subject": "Your Project Has Been Successfully Created 🚀",
        "project": {
            "name": "ReactJS_SPA",
            "creator": {
                "full_name": "Jimmy Hung",
                "email": "hung@gmail.com",
            },
             "owner": {
                 "full_name": "Huyen Tran",
                "email": "huyen@gmail.com",
            },
            "created": datetime.now().strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # delete_project
    context_delete_project = {
        "subject": "Your Project Has Been Successfully Deleted 🚀",
        "project": {
            "name": "ReactJS_SPA",
            "creator": {
                "full_name": "Jimmy Hung",
                "email": "hung@gmail.com",
            },
            "owner": {
                 "full_name": "Huyen Tran",
                "email": "huyen@gmail.com",
            },
            "date_delete": datetime.now().strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # create_farm
    context_create_farm = {
        "subject": "Your Farm Has Been Successfully Created 🚀",
        "farm": {
            "farm_name": "FarmABC",
            "created": datetime.now().strftime("%B %d, %Y"),
            "owner": {
                "full_name": "Tran Huyen",
            },
            "creator": {
                "full_name": "Jimmy Hung",
            }
        },
        "year":  datetime.now().year,
    } 
    # update_farm
    context_update_farm = {
        "subject": "Your Farm Has Been Successfully Updated 🚀",
        "to_user": {
            "name": "Huyen Tran",
        },
        "info_farm": {
            "farm_name": "FarmABC",
            "new_farm_name": "FarmXYZ",
            "date_update": datetime.now().strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # delete_farm
    context_delete_farm = {
        "subject": "Your Farm Has Been Successfully Deleted 🚀",
        "to_user": {
            "name": "Huyen Tran",
        },
        "info_farm": {
            "farm_name": "FarmABC",
            "date_delete": datetime.now().strftime("%B %d, %Y"),
        },
        "project": "ReactJS_SPA",
        "year":  datetime.now().year,
    }
    # create_monitor
    context_create_monitor = {
        "subject": "Your Monitor Has Been Successfully Created 🚀",
        "monitor": {
            "name": "UseEffect",
            "created": datetime.now().strftime("%B %d, %Y"),
            # monitor.owner.full_name
            "owner": {
                "full_name": "Tran Huyen",
            },
            # monitor.creator.full_name
            "creator": {
                "full_name": "Jimmy Hung",
            },
            "farm":{
                "name": "FarmABC",
                "project": {
                    "name": "ReactJS_SPA",
                }
            },
            
            
        },
        "year":  datetime.now().year,
    }
    # update_monitor
    context_update_monitor = {
        "subject": "Your Monitor Has Been Successfully Updated 🚀",
        "to_user": {
            "name": "Huyen Tran",
        },
        "info_monitor": {
            "old_monitor_name": "UseEffect",
            "new_monitor_name": "UseState",
            "date_update": datetime.now().strftime("%B %d, %Y"),
            "farm_name": "FarmABC",
            "project_name": "ReactJS_SPA",
        },
        "year":  datetime.now().year,
    }
    # delete_monitor
    context_delete_monitor = {
        "subject": "Your Monitor Has Been Successfully Deleted 🚀",
        "to_user": {
            "name": "Huyen Tran",
        },
        "info_monitor": {
            "monitor_name": "UseState",
            "date_delete": datetime.now().strftime("%B %d, %Y"),
            "farm_name": "FarmABC",
            "project_name": "ReactJS_SPA",
        },
        "year":  datetime.now().year,
    }
    # update_to_owner
    context_update_to_owner = {
        "subject": "You've Updated a Member's Role Successfully 🚀",
        "project": "ReactJS_SPA",
        "project_manager": {
            "name": "Tran Huyen",
        },
        "member": {
            "name": "Jimmy Hung",
            "email": "hung@gmail.com",
            "previous_role": "Read",
            "new_role": "Admin",
            "update_date": datetime.now().strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # update_to_member
    context_update_to_member = {
        "subject": "Your Role Has Been Updated Successfully 🚀",
        "project": "ReactJS_SPA",
        "project_manager": {
            "name": "Tran Huyen",
        },
        "member": {
            "name": "Jimmy Hung",
            "email": "hung@gmail.com",
            "previous_role": "Read",
            "new_role": "Admin",
            "update_date": datetime.now().strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # Member
    # delete_to_member
    context_delete_to_member = {
        "subject": "You have been removed from the",
        "project": "ReactJS_SPA",
        "project_manager": {
            "name": "Tran Huyen",
        },
        "member": {
            "name": "Jimmy Hung",
            "email": "hung@gmail.com",
        },
        "delete_date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,        
    }
    # delete_to_owner
    context_delete_to_owner = {
        "subject": "You've Been Deleted in Project Successfully 🚀",
        "project": "ReactJS_SPA",
        "project_manager": {
            "name": "Tran Huyen",
        },
        "member": {
            "name": "Jimmy Hung",
            "email": "hung@gmail.com",
        },
        "delete_date": datetime.now().strftime("%B %d, %Y"),
        "year":  datetime.now().year,
    }
    # email_upgrade
    context_upgrade_subscription = {
        "subject": "You've Upgraded Subcription Successfully 🚀",
        "to_user": {
            "name": "Huyen Tran",
        },
        "subscription_detail": {
            "plan": "Enterprise",
            "period": "1 Week",
            "date": datetime.now().strftime("%B %d, %Y"),
            "next_billing_date": (datetime.now() + timedelta(days=7)).strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # email_subcribe
    context_subcribe_subscription = {
        "subject": "You've Actived Subcription Successfully 🚀",
        "to_user": {
            "name": "Huyen Tran",
        },
        "subscription_detail": {
            "plan": "Bussiness",
            "period": "1 Week",
            "date": datetime.now().strftime("%B %d, %Y"),
            "next_billing_date": (datetime.now() + timedelta(days=7)).strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # email-cancel
    context_cancel_subscription = {
        "subject": "Your subscription has been successfully cancelled.🚀",
        "to_user": {
            "name": "Huyen Tran",
        },
        "subscription_detail": {
            "current_subscription": "Bussiness",
            "next_subscription": "Free",
            "date_end_current_subscription": (datetime.now() + timedelta(days=7)).strftime("%B %d, %Y"),
            "date_will_start": (datetime.now() + timedelta(days=7)).strftime("%B %d, %Y"),
        },
        "year":  datetime.now().year,
    }
    # email remind subcribe subscription
    context_remind_subcribe_subscription = {
        "subject": "Welcome to Portstool Monitoring Service🚀",
        "user": {
            "full_name": "Huyen Tran",
        },
        "registration_date": (datetime.now() - timedelta(days=7)).strftime("%B %d, %Y"),
        "link_subscription": "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/FMfcgzGtwzsqDGPpPRQGwTGHmphBsbjx",
        "year":  datetime.now().year,
    }
    # Email report monthly
    context_report_monthly = {
        "subject": "Your Monthly Report",
        "user": {
            "full_name": "Huyen Tran",
        },
        "year":  datetime.now().year,
    }
     # Email report weekly
    context_report_weekly = {
        "subject": "Your Weekly Report",
        "user": {
            "full_name": "Huyen Tran",
        },
        "year":  datetime.now().year,
    }
    # D:\Freelance\frontend-init\resource\template\templates\Account\Email\remind_subcribe.html
    template = 'Report/weekly.html'
    send_mail("🚀Your Project Has Been Successfully Created 🚀🐤", template, context_report_weekly, email="ttminhuyen1111@gmail.com")

    return render(request, template, context_report_weekly)