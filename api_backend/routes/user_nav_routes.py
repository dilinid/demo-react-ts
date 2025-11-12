from fastapi import APIRouter

router = APIRouter()

@router.get("/navigation")
async def get_navigation():
    """
    Get navigation menu items with minimal B&W icons
    """
    return {
        "items": [
            {
                "label": "Dashboard",
                "path": "/dashboard",
                "icon": "⌂",
                "quickAccess": False,
            },
            {
                "label": "Transactions",
                "path": "/transactions",
                "icon": "⇄",
                "quickAccess": True,
                "subMenu": [
                    {
                        "label": "All Transactions",
                        "path": "/transactions/all",
                        "icon": "☰",
                        "quickAccess": True,
                    },
                    {
                        "label": "Pending",
                        "path": "/transactions/pending",
                        "icon": "◷",
                        "quickAccess": False,
                    },
                    {
                        "label": "Completed",
                        "path": "/transactions/completed",
                        "icon": "✓",
                        "quickAccess": False,
                    },
                ],
            },
            {
                "label": "Member List",
                "path": "/members",
                "icon": "⚊",
                "quickAccess": False,
                "subMenu": [
                    {
                        "label": "Active Members",
                        "path": "/members/active",
                        "icon": "○",
                        "quickAccess": True,
                    },
                    {
                        "label": "Inactive Members",
                        "path": "/members/inactive",
                        "icon": "●",
                        "quickAccess": False,
                    },
                ],
            },
            {
                "label": "Daily Reports",
                "path": "/reports",
                "icon": "▦",
                "quickAccess": True,
                "subMenu": [
                    {
                        "label": "Sales Report",
                        "path": "/reports/sales",
                        "icon": "◈",
                        "quickAccess": False,
                    },
                    {
                        "label": "Activity Report",
                        "path": "/reports/activity",
                        "icon": "▭",
                        "quickAccess": True,
                    },
                    {
                        "label": "Summary",
                        "path": "/reports/summary",
                        "icon": "≡",
                        "quickAccess": False,
                    },
                ],
            },
            {
                "label": "Settings",
                "path": "/settings",
                "icon": "⚙",
                "quickAccess": False,
            },
        ]
    }
