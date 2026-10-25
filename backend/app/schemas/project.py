from pydantic import BaseModel, ConfigDict


class ProjectLink(BaseModel):
    label: str
    href: str


class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")

    slug: str
    title: str
    kicker: str
    summary: str
    problem: str
    approach: str
    architecture: list[str]
    stack: list[str]
    period: str
    status: str
    statusTone: str
    metric: str
    metricLabel: str
    limitations: str
    links: list[ProjectLink]


class ProjectCollection(BaseModel):
    items: list[Project]
    total: int
