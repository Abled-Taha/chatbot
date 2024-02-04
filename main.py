from typing import List, Optional

from fastapi import FastAPI
from openai import AsyncOpenAI
from openai.types.beta.threads.run import RequiredAction, LastError
from openai.types.beta.threads.run_submit_tool_outputs_params import ToolOutput
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # used to run with react server
        "https://c936-139-135-44-35.ngrok-free.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncOpenAI(
    api_key="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",
)
student = "asst_fnszkgkq72eWS2O0SEP5SM0Y" #PMDOK_Guider
student = "asst_VBonk4SScFovaS7KW8UOiVZU" #PMDOK_Quiz

run_finished_states = ["completed", "failed", "cancelled", "expired", "requires_action"]


class RunStatus(BaseModel):
    run_id: str
    thread_id: str
    status: str
    required_action: Optional[RequiredAction]
    last_error: Optional[LastError]


class ThreadMessage(BaseModel):
    content: str
    role: str
    hidden: bool
    id: str
    created_at: int


class Thread(BaseModel):
    messages: List[ThreadMessage]


class CreateMessage(BaseModel):
    content: str


class GetUserRole(BaseModel):
    role: str


@app.post("/api/new")
async def post_new(message: GetUserRole):
    thread = await client.beta.threads.create()
    await client.beta.threads.messages.create(
        thread_id=thread.id,
        content="Greet the user and tell it about yourself and ask it what it is looking for.",
        role="user",
        metadata={"type": "hidden"},
    )
    if message.role == "student":
        run = await client.beta.threads.runs.create(
            thread_id=thread.id, assistant_id=student
        )
    else:
        print(student, 'euryuewruewrewu')
        run = await client.beta.threads.runs.create(
            thread_id=thread.id, assistant_id=student
        )

    return RunStatus(
        run_id=run.id,
        thread_id=thread.id,
        status=run.status,
        required_action=run.required_action,
        last_error=run.last_error,
    )


@app.get("/api/threads/{thread_id}/runs/{run_id}")
async def get_run(thread_id: str, run_id: str):
    run = await client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)

    return RunStatus(
        run_id=run.id,
        thread_id=thread_id,
        status=run.status,
        required_action=run.required_action,
        last_error=run.last_error,
    )


@app.post("/api/threads/{thread_id}/runs/{run_id}/tool")
async def post_tool(thread_id: str, run_id: str, tool_outputs: List[ToolOutput]):
    run = await client.beta.threads.runs.submit_tool_outputs(
        run_id=run_id, thread_id=thread_id, tool_outputs=tool_outputs
    )
    return RunStatus(
        run_id=run.id,
        thread_id=thread_id,
        status=run.status,
        required_action=run.required_action,
        last_error=run.last_error,
    )


@app.get("/api/threads/{thread_id}")
async def get_thread(thread_id: str):
    messages = await client.beta.threads.messages.list(thread_id=thread_id)
    
    # a = messages.data[0].content[0].text.value
    # # print(messages.data[0])
    # splittedOne = str(a.split("Question: "))
    # splittedTwice = str(splittedOne.split("\n\nI "))
    # final = splittedTwice.removeprefix("['[\"")
    # final = splittedTwice.removeprefix("[\"['")
    # final = final.removesuffix("\"]']")
    # final = final.removesuffix("']\"]")
    # final = final.replace("\\n","\n")
    # final = final.replace("\\'", "\'")
    # print(final)
    result = [
        ThreadMessage(
            # content=message.content[0].text.value,
            content=message.content[0].text.value,
            role=message.role,
            hidden="type" in message.metadata and message.metadata["type"] == "hidden",
            id=message.id,
            created_at=message.created_at,
        )
        for message in messages.data
    ]
    
    return Thread(
        messages=result,
    )


@app.post("/api/threads/{thread_id}")
async def post_thread(thread_id: str, message: CreateMessage):
    await client.beta.threads.messages.create(
        thread_id=thread_id, content=message.content, role="user"
    )

    run = await client.beta.threads.runs.create(
        thread_id=thread_id, assistant_id=student
    )

    return RunStatus(
        run_id=run.id,
        thread_id=thread_id,
        status=run.status,
        required_action=run.required_action,
        last_error=run.last_error,
    )
