from collections import deque

memory = deque(maxlen=10)


def add(role, content):
    memory.append({
        "role": role,
        "content": content
    })


def history():
    return list(memory)


def clear():
    memory.clear()